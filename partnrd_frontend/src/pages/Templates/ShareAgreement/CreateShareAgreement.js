import React, { useEffect, useState } from "react";
import { Column, Row } from "simple-flexbox";
import CreateButton from "../../../components/CreateButton";
import { createUseStyles } from "react-jss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { useParams } from "react-router";
import { CircularProgress } from "@material-ui/core";
import SLUGS from "../../../resources/slugs";
import {
  Beginning,
  Recitals,
  Articles,
  Article2,
  Article4,
  Article6,
  Article7,
  Article8,
  Article10,
  Article10b,
  Article9,
} from "./SharePages";
import AlertDialog, { DeleteDialog, EditDialog } from "./Info";
import { PDFExport } from "@progress/kendo-react-pdf";

const useStyles = createUseStyles({
  lastRow: {
    marginTop: 10,
  },

  page: {
    backgroundColor: "#ffffff",
  },

  paperStyle: {
    background: "white",
    padding: 50,
    marginBottom: 50,
    marginTop: 20,
    fontSize: 12,
    fontFamily: "Times New Roman",
    boxShadow: "unset !important",
    border: `1px solid #d8d8d8`,
    borderRadius: 0,
  },
  container: {
    width: "100%",
    maxWidth: "1300px",
    marginLeft: "auto",
    marginRight: "auto",
  },

  buttonRow: {
    marginTop: 10,
  },

  title: {
    marginTop: 10,
    color: "#000",
    fontSize: "30px",
  },
  paragraph: {
    whiteSpace: "pre-line",
  },

  rowC: {
    display: "flex",
    flexDirection: "row",
  },

  rowBtn: {
    marginRight: "15px !important",
  },
});

export function CreateShareAgreement() {
  const { id } = useParams();
  const { push } = useHistory();

  const classes = useStyles();
  const token = sessionStorage.getItem("xrsf");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const api = `${process.env.REACT_APP_API}/api/agreements/${id}`;

  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState({
    loading: false,
  });

  const pdfExportComponent = React.useRef(null);
  const handleExportWithComponent = (e) => {
    pdfExportComponent.current.save();
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    setIsLoading(true);
    await axios
      .get(api, config)
      .then((res) => {
        setFormData(res.data);
        // console.log(res);
        setIsLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        push(SLUGS.agreements);
      });
  };

  const name = "Review & Download";
  return !isLoading ? (
    <div>
      <Row>
        <Column
          className={[classes.container, classes.title].join(" ")}
          horizontal="start"
        >
          {formData && formData[0] && <h1>{formData[0].name}</h1>}
        </Column>
        <Column
          className={classes.container}
          vertical="center"
          horizontal="end"
        >
          <div className={classes.rowC}>
            <div className={[classes.rowC, classes.rowBtn].join(" ")}>
              <EditDialog
                api={api}
                config={config}
                agreeName={formData[0].name}
                getData={getData}
              />
              <DeleteDialog config={config} api={api} />
            </div>
            <CreateButton label={name} onClick={handleExportWithComponent} />
          </div>
        </Column>
      </Row>
      <Row>
        <Row className={[classes.lastRow, "agreementView"].join(" ")}>
          <DisplayData
            data={formData}
            pdfExportComponent={pdfExportComponent}
          />
        </Row>
      </Row>
    </div>
  ) : (
    <div>
      <CircularProgress color="inherit" />
    </div>
  );
}

function DisplayData({ data, pdfExportComponent }) {
  const createdDate = data[0].created_at;
  const classes = useStyles();
  const val = JSON.parse(data[0].data);

  const corpName = val.companyName;
  const corpPlace = val.companyPlace;
  const corpDate = val.companyDate;
  const corpFax = val.companyFax;
  const corpContact = val.companyContact;
  const optOut = val.optOut;
  const control = val.control;

  const shareData = [];
  const personData = [];
  const investorData = [];
  const founderData = [];
  const directorData = [];

  val.shareInfo.map((x, i) => {
    return (shareData[i] = {
      shareID: x.shareID,
      shareName: x.shareName,
      shareClass: x.shareClass,
      shareType: x.shareType,
      shareTotal: x.shareTotal,
    });
  });

  val.founderInfo.map((x, i) => {
    return (personData[i] = {
      ID: x.personID,
      name: {
        fname: x.fname,
        prefName: x.preferredName,
      },
      phone: x.phone,
      email: x.email,
      address: [x.streetName, x.provinceName, x.cityName, x.postalCode],
      IsCompany: [x.role, x.corpName],
      IsBoard: x.onBoard,
      shareinfo: x.shareinfo,
    });
  });

  val.founderInfo.forEach((x) => {
    if (x.role === "Founder") {
      founderData.push({
        ID: x.personID,
        name: {
          fname: x.fname,
          prefName: x.preferredName,
        },
        phone: x.phone,
        email: x.email,
        address: [x.streetName, x.provinceName, x.cityName, x.postalCode],
        IsCompany: [x.role, x.corpName],
        IsBoard: x.onBoard,
        shareinfo: x.shareinfo,
      });
    }
  });
  val.founderInfo.forEach((x) => {
    if (x.role === "Investor") {
      investorData.push({
        ID: x.personID,
        name: {
          fname: x.fname,
          prefName: x.preferredName,
        },
        phone: x.phone,
        email: x.email,
        address: [x.streetName, x.provinceName, x.cityName, x.postalCode],
        IsCompany: [x.role, x.corpName],
        IsBoard: x.onBoard,
        shareinfo: x.shareinfo,
      });
    }
  });
  if (!optOut) {
    val.directInfo.map((x, i) => {
      return (directorData[i] = {
        ID: x.personID,
        name: x.name,
        nominee: x.nominee,
        shareinfo: x.shareinfo,
      });
    });
  }

  return (
    <div>
      <PDFExport paperSize="A4" ref={pdfExportComponent}>
        <Paper className={classes.paperStyle}>
          <Row horizontal="center">
            <AlertDialog
              title={
                <div>
                  <div>SHAREHOLDERS AGREEMENT</div>
                  <div>OF</div>
                  <div>{corpName.toUpperCase()}</div>
                </div>
              }
              info={
                <div>
                  <div>
                    This paragraph defines the agreement, names all parties, and
                    chooses the laws under which the agreement is made.
                  </div>
                </div>
              }
            />
          </Row>
          <Beginning
            corpName={corpName}
            corpData={corpDate}
            corpPlace={corpPlace}
            personData={personData}
          />
          <Recitals />
          <Articles
            corpPlace={corpPlace}
            shareData={shareData}
            founderData={founderData}
            majControl={control}
          />
          <Article2 />
          <Article4
            directorData={directorData}
            shareData={shareData}
            optOut={optOut}
          />
          <Article6 createdDate={createdDate} />
          <Article7 />
          <Article8 />
          <Article9 />
          <Article10 />
          <Article10b
            corpName={corpName}
            corpContact={corpContact}
            corpFax={corpFax}
          />
          <Row horizontal="center">
            IN WITNESS OF WHICH the Parties have duly executed this Agreement
          </Row>
          <SigAppend name={corpName} IsFounder={false} />
          {founderData.length > 0 &&
            founderData.map((x, i) => {
              return (
                <div key={i}>
                  <SigAppend name={x.name.fname} IsFounder={true} />
                </div>
              );
            })}
          {investorData.length > 0 &&
            investorData.map((x, i) => {
              return (
                <div key={i}>
                  <SigAppend name={x.name.fname} IsFounder={false} />
                </div>
              );
            })}
        </Paper>
      </PDFExport>
    </div>
  );
}

const SigAppend = ({ name, IsFounder }) => {
  return (
    <div>
      {!IsFounder && (
        <Row horizontal="end">
          <div>By: </div>
          <div>
            <br/>
            <div style={{ borderBottom: "1px solid" }} />
            <div>Name: {name}</div>
            <div>Title:</div>
          </div>
        </Row>
      )}
      {IsFounder && (
        <Row horizontal="start">
          <div>
            SIGNED, SEALED, AND
            <br />
            DELIVERED in the presence of:
            <br />
            <br />
            <div style={{ borderTop: "1px solid" }} />
            {name}
          </div>
        </Row>
      )}
    </div>
  );
};

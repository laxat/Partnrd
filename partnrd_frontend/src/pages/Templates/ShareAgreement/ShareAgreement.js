import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Input, FormGroup, Label, Tooltip, InputGroupAddon, InputGroupText } from "reactstrap";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { SharesTable, FoundersTable } from "./Table";
import SLUGS from "../../../resources/slugs";
import { createUseStyles } from "react-jss";
import { BsInfoCircleFill as InfoIcon } from "react-icons/bs";


const Styles = styled.div`
  padding: 0.8rem;

  label {

    margin-top: 10px
    margin-bottom: 10px;
  }
  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      color: palevioletred
      margin: 0;
      padding: 0.8rem;
      border-top: 1px solid black;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      Input {
        font-size: 0.9rem;
        padding: 0;
        margin-top: 10px;
        margin-bottom: 10px;
        border: 2;
      }
    }
  }

`;

const useStyles = createUseStyles({
  iconSize: {
    fontSize: 15,
    marginBottom: 3,
  },

  spacing: {
    marginTop: 5,
    marginBottom: 2,
    marginRight: 5,
  },
});

function ShareAgreement() {
  const methods = useForm();
  const methods1 = useForm();
  const methods2 = useForm();
  const methods3 = useForm();
  const methods4 = useForm();

  const { push } = useHistory();
  const [mergeData, setMergeData] = useState([]);
  const [directData, setDirectData] = useState([]);
  const [step, setStep] = useState(0);
  const [error, setError] = useState({
    type: "",
    message: "",
  });
  const [shareInfo, setShareInfo] = useState([
    {
      shareID: 1,
      shareName: "",
      shareClass: "Class A",
      shareType: "Common",
      shareTotal: 0,
    },
  ]);
  const [optOut, setOptOut] = useState(false); 
  const [shareList, setShareList] = useState([
    {
      id: 1,
      selected: false,
    },
  ]);
  const [control, setControl] = useState({
      value: 50
  })
  const [founderInfo, setFounderInfo] = useState([
    {
      personID: 1,
      fname: "",
      preferredName: "",
      role: "Founder",
      streetName: "",
      cityName: "",
      provinceName: "",
      postalCode: "",
      phone: "",
      email: "",
      isCorp: false,
      onBoard: false,
      corpName: "",
      shareinfo: [
        {
          refId: 1,
          numHeld: 0,
        },
      ],
    },
  ]);

  const idata = `shareinfo[${0}]`;
  const [inputList, setInputList] = useState([
    [{ name: idata, index: 0, refID: 1, numHeld: 0 }],
  ]);

  const createAgreement = `${process.env.REACT_APP_API}/api/agreements`;

  const onSubmit = async (data) => {
    if (step === 0) {
      const item = [...mergeData];
      item[0] = data;
      setMergeData(item);
      setStep(1);
    }
    if (step === 1) {
      const item = [...mergeData];
      item[1] = data;
      setMergeData(item);
      setStep(2);
    }
    if (step === 2) {
      // console.log(data);
      setError({});
      const shares = mergeData[1].shareInfo;
      const persons = data.founderInfo;
      let errors = [];

      for (let i = 0; i < shares.length; i++) {
        let shareTotal = 0;
        for (let j = 0; j < persons.length; j++) {
          if (persons[j].shareinfo[i]) {
            var num = parseInt(persons[j].shareinfo[i].numHeld);
            shareTotal += num;
          }
        }
        if (shares[i].shareTotal < shareTotal) {
          // console.log("PANIC");
          errors.push(shareTotal);
          let e = {};
          e.type = "numHeld";
          e.message = "numHeld of a share must  be less than the total shares";
          setError(e);
        }
      }

      if (errors.length === 0) {
        setError({});
        const item = [...mergeData];
        item[2] = data;
        setMergeData(item);

        let d = [...directData];
        d = [];
        data.founderInfo.forEach((x) => {
          if (x.onBoard) {
            d.push({
              personID: x.personID,
              name: x.fname,
              shareinfo: x.shareinfo,
              nominee: "Founder",
              quorum: 0,
            });
          }
        });
        setDirectData(d);
        setStep(3);
      }
    }
    if (step === 3)
    {
      setError({});
      setOptOut(false);
      if (control.value < 1 || control.value > 100) {
        let e = {};
        e.type = "control";
        e.message = "Majority Control must be a valid percentage between 1 and 100";
        setError(e);
      }
      else {
        const item = [...mergeData];
        item[3] = { control: control.value };
        setMergeData(item);
        setStep(4)
      }
      
    }
    if (step === 4) {
      setError({ });
      methods4.unregister("lawyer")
      // console.log(data);
      if (optOut === false) {
        if (data.quorum <= directData.length) {
          // console.log(directData);
          const direct = {
            directInfo: [],
          };

          directData.map((x, i) => {
            return (
              direct.directInfo[i] = {
                name: x.name,
                personID: x.personID,
                nominee: x.nominee,
                shareinfo: x.shareinfo,
                quorum: data.quorum,
              }
            )
          });

          const finalData = {
            ...mergeData[0],
            ...mergeData[1],
            ...mergeData[2],
            ...mergeData[3],
            ...direct,
            optOut: false
          };
          // console.log(JSON.stringify(finalData, null, 2));
          sendData(finalData);
        } else {
          let e = { };
          // console.log("Here");
          e.type = "quorum";
          e.message = "Quorum must be less than or equal to number of directors";
          setError(e);
        }
      } else {
        const finalData = {
          ...mergeData[0],
          ...mergeData[1],
          ...mergeData[2],
          ...mergeData[3], 
          optOut: true
        };
        sendData(finalData);
      }
    }
  };

  const sendData = async (data) => {
    // console.log(JSON.stringify(data, null, 2));
    const token = sessionStorage.getItem("xrsf");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const newData = JSON.parse(localStorage.getItem("data"));

    const d = {
      name: newData.agreeName,
      data: data,
    };

    await axios.post(createAgreement, d, config).then((res) => {
      // console.log(res);
      localStorage.removeItem("shareData");
      push(SLUGS.createShare + res.data.id);
    });
  };
  const shareColumns = [
    {
      Header: "Reference #",
      id: "shareHeader",
      columns: [
        {
          Header: (
            <HeaderComponent
              title="Share ID"
              info="Share ID for better access to share information"
              id="shareID"
            />
          ),
          accessor: "refNum",
          id: "refNum",
        },
      ],
    },
    {
      Header: "Share Information",
      columns: [
        {
          Header: (
            <HeaderComponent
              title="Share Name"
              info="What is the name of the share?"
              id="share2"
            />
          ),
          accessor: "shareName",
          id: "ShareNum",
        },
        {
          Header: (
            <HeaderComponent
              title="Share Class"
              info="What is the class of the share?"
              id="share3"
            />
          ),
          accessor: "shareClass",
          id: "ShareClass",
        },
        {
          Header: (
            <HeaderComponent
              title="Share Type"
              info="What type fo share is the currently being referred to"
              id="share4"
            />
          ),
          accessor: "shareType",
          id: "ShareType",
        },
        {
          Header: (
            <HeaderComponent
              title="Share Total"
              info="What are the total amount of shares this company currently has?"
              id="share5"
            />
          ),
          accessor: "shareTotal",
          id: "ShareTotal",
        },
      ],
    }, 
  ];

  const founderColumns = [
    {
      Header: "Shares Held",
      accessor: "sharesHeld",
    },

    {
      Header: "Personal Information",
      id: "personID",
    },
    {
      Header: "Contact Information", 
      id: "contact"
    },
  ];

  return (
    <div>
      {step === 0 && (
        <FormProvider {...methods}>
          <form
            className="mediumForm"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <h2>Create Agreement</h2>
            <FormGroup>
              <HeaderComponent
                title="What is your company's Name?"
                info="Write Down Legal Company name, or Company you represent"
                id="compName"
              />
              <Input
                required
                type="text"
                name="companyName"
                innerRef={methods.register}
              />
              <HeaderComponent
                title="Who is your Company's main contact?"
                info="Enter the Full Legal Name of you Company's main contact"
                id="compContact"
              />
              <Input
                required
                type="text"
                name="companyContact"
                innerRef={methods.register}
              />
              <HeaderComponent
                title="What is your company's fax number"
                info="Enter the company Fax contact"
                id="compFax"
              />
              <Input
                required
                type="tel"
                name="companyFax"
                innerRef={methods.register}
              />
              <HeaderComponent
                title="What is your company's place of incorporation?"
                info="Is you Company located in Greater Canada or Ontario"
                id="compPlace"
              />
              <Input
                required
                type="select"
                name="companyPlace"
                innerRef={methods.register}
              >
                <option>Canada</option>
                <option>Ontario</option>
              </Input>
              <HeaderComponent
                title="When was your company incorporated?"
                info="When was your company founded?"
                id="compDate"
              />
              <Input
                required
                type="date"
                name="companyDate"
                innerRef={methods.register}
              />
              <button type="submit" onClick={methods.handleSubmit(onSubmit)}>
                Next Step
              </button>
            </FormGroup>
          </form>
        </FormProvider>
      )}
      {step === 1 && (
        <FormProvider {...methods1}>
          <form
            className="largeForm"
            onSubmit={methods1.handleSubmit(onSubmit)}
          >
            <h2>Create Agreement</h2>
            <FormGroup>
              <Label for="sTable">What Does Your Company Have?</Label>
              <div className="Table">
                <Styles>
                  <SharesTable
                    columns={shareColumns}
                    ref={methods1.register}
                    data={shareInfo}
                    setData={setShareInfo}
                    methods={methods1}
                    shareList={shareList}
                    setShareList={setShareList}
                  />
                </Styles>
              </div>
              <button onClick={() => setStep(0)}>Go Back</button>
              <button type="submit" onClick={methods1.handleSubmit(onSubmit)}>
                Next Step
              </button>
            </FormGroup>
          </form>
        </FormProvider>
      )}
      {step === 2 && (
        <FormProvider {...methods2}>
          <form
            className="largeForm"
            onSubmit={methods2.handleSubmit(onSubmit)}
          >
            <h2>Create Agreement</h2>
            <FormGroup>
              <Label>Who are the Stakeholders?</Label>
              {error && error.type && error.type === "numHeld" && (
                <p>{error.message}</p>
              )}
              <div className="Table">
                <Styles>
                  <FoundersTable
                    columns={founderColumns}
                    data={founderInfo}
                    ref={methods2.register}
                    methods={methods2}
                    setData={setFounderInfo}
                    shareData={shareInfo}
                    inputList={inputList}
                    setInputList={setInputList}
                  />
                </Styles>
              </div>
              <button onClick={() => setStep(1)}>Go Back</button>
              <button type="submit" onClick={methods2.handleSubmit(onSubmit)}>
                Next Step
              </button>
            </FormGroup>
          </form>
        </FormProvider>
      )}
      {step === 3 && (
        <div>
          <FormProvider {...methods4}>
            <form
              className="mediumForm"
              onSubmit={methods4.handleSubmit(onSubmit)}
            >
              <h2>Create Agreement</h2>
              <ControlQuest
                methods={methods4}
                data={control}
                setData={setControl}
              />
              {error && error.type && error.type === "control" && (
                <p>{error.message}</p>
              )}
              <button onClick={() => setStep(2)}>Go Back</button>
              <button type="submit" onClick={methods2.handleSubmit(onSubmit)}>
                Next Step
              </button>
            </form>
          </FormProvider>
        </div>
      )}
      {step === 4 && (
        <FormProvider {...methods3}>
          <form
            className="mediumForm"
            onSubmit={methods3.handleSubmit(onSubmit)}
          >
            <h2>Create Agreement</h2>
            <Styles>
              <DirectorsQuest
                data={directData}
                setData={setDirectData}
                optOut={optOut}
                setOptOut={setOptOut}
                methods={methods3}
              />

              {error && error.type && error.type === "quorum" && (
                <p>{error.message}</p>
              )}
            </Styles>
            <button onClick={() => setStep(3)}>Go Back</button>
            <button type="submit">Finish</button>
          </form>
        </FormProvider>
      )}
    </div>
  );
}
export default ShareAgreement;

export function HeaderComponent({ title, info, id }) {
  const classes = useStyles();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);
  return (
    <div>
      <label className={classes.spacing}>
        {title}
        {"  "}
      </label>
      <InfoIcon className={classes.iconSize} id={id} />
      <Tooltip placement="top" isOpen={tooltipOpen} target={id} toggle={toggle}>
        {info}
      </Tooltip>
    </div>
  );
}

const DirectorsQuest = React.forwardRef(
  ({ data, optOut, methods, setData, setOptOut }, ref) => {
    const directData = [...data];

    const handleDirectChange = (i, e) => {
      const { id, value } = e.target;
      const list = [...data];
      list[i][id] = value;
      setData(list);
    };
    return directData.length > 0 ? (
      <div>
        {directData.map((x, i) => {
          return (
            <div key={i}>
              <label>
                Director {i + 1} is {x.name} nominated by the
              </label>
              <Input
                required
                id="nominee"
                name={`directorInfo[${i}][nominee]`}
                type="select"
                onChange={(e) => handleDirectChange(i, e)}
                value={data[i].nominee}
                innerRef={methods.register}
              >
                <option>Founder</option>
                <option>Common</option>
                <option>Preferred</option>
              </Input>
            </div>
          );
        })}
        <label>
          What is the minimum number of Directors required to reach quorum?
        </label>

        <Input
          required
          type="number"
          name="quorum"
          innerRef={methods.register}
        />
      </div>
    ) : (
      <div>
        <label>
          You have not selected any directors, Do you wish to opt out
        </label>
        {!optOut && (
          <button required onClick={() => setOptOut(true)}>
            Opt out
          </button>
        )}
          {optOut && (
            <p>You have chosen to opt out</p>
        )}
      </div>
    );
  }
);

const ControlQuest = ({ methods, data, setData }, props) => {

  const numChange = methods.watch("change", props.change);
  const numLawyers = methods.watch("lawyer", props.lawyer);
  
  const handleControlChange = (e) => {
    setData({value: e.target.value})
  }

  return (
    <div>
      <label htmlFor="yes">Would you like to change this number?</label>
      <br />
      <input type="radio" name="change" value={1} ref={methods.register} />
      <label style={{ paddingLeft: 10, paddingRight: 10 }}>Yes</label>

      <input type="radio" name="change" value={0} ref={methods.register} />
      <label style={{ paddingLeft: 10 }}>No</label>
      {numChange > 0 && (
        <div>
          <label>Would you like to contact your Lawyer</label>
          <fieldset id="g2">
            <input
              type="radio"
              id="ask-lawyer"
              value={0}
              name="lawyer"
              ref={methods.register}
            />
            <label style={{ paddingLeft: 10, paddingRight: 10 }}>Yes</label>
            <input
              type="radio"
              id="ask-lawyer"
              value={1}
              name="lawyer"
              ref={methods.register}
            />
            <label style={{ paddingLeft: 10 }}>No</label>
          </fieldset>
        </div>
      )}
      {numChange > 0 && numLawyers > 0 && (
        <div>
          <p>
            “Control” means: (a) with respect to any corporation, the ownership,
            beneficially and legally of voting securities in the capital of such
            corporation, to which are attached more than fifty (
            {data.value}%) of the votes that may be cast to elect the
            directors of such corporation and such votes are sufficient (if
            exercised) to elect a majority of the directors; and (b) with
            respect to a partnership, trust, syndicate, or other entity, actual
            power or authority to manage and direct the affairs of, or ownership
            of more than fifty ({data.value}%) of the beneficial
            interest of such entity.
          </p>

          <InputGroupAddon addonType="append">
            <Input
              name="majorityControl"
              type="number"
              min="1"
              max="100"
              onChange={(e) => handleControlChange(e)}
              value={data.value}
              innerRef={methods.register({
                min: 1,
                max: 100,
              })}
            />
            <InputGroupText>%</InputGroupText>
          </InputGroupAddon>
        </div>
      )}
    </div>
  );
}; 

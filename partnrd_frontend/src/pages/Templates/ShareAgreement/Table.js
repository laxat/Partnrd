import React from "react";
import { useTable } from "react-table";
import { Controller } from "react-hook-form";
import { Input, Button } from "reactstrap";
import "./test.css";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

export const SharesTable = React.forwardRef(
  ({ columns, data, setData, shareList, setShareList, methods }, ref) => {
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, getTableBodyProps, headerGroups } = useTable({
      columns,
      data,
    });

    let errors = methods.formState.errors.shareInfo;

    const handleInput = (i, e) => {
      const { id, value } = e.target;
      const list = [...data];
      list[i][id] = value;
      setData(list);
    };

    const addShareRow = function () {
      let l = data.length + 1;
      const d = [...data];
      const list = [...shareList];

      const item = {
        shareID: l,
        shareName: "",
        shareClass: "Class A",
        shareType: "Common",
        shareTotal: 0,
      };

      d.push(item);
      list.push({
        id: l,
        selected: false,
      });
      setShareList(list);
      setData(d);
    };
    // Render the UI for your table
    return (
      <div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {data.map((row, i) => {
              //prepareRow(row);
              return (
                <tr key={i}>
                  <td>
                    {" "}
                    <Controller
                      name={`shareInfo[${i}].shareID`}
                      control={methods.control}
                      defaultValue={data[i].shareID}
                      as={<p>{data[i].shareID}</p>}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      id={"shareName"}
                      name={`shareInfo[${i}].shareName`}
                      value={data[i].shareName}
                      onChange={(e) => handleInput(i, e)}
                      innerRef={methods.register({
                        required: "ShareName is Required",
                      })}
                    />
                    {errors &&
                      errors[i] &&
                      errors[i].shareName &&
                      errors[i].shareName.type === "required" && (
                        <p>{errors[i].shareName.message}</p>
                      )}
                  </td>
                  <td>
                    <Input
                      required
                      type="select"
                      id={"shareClass"}
                      name={`shareInfo[${i}].shareClass`}
                      value={data[i].shareClass}
                      onChange={(e) => handleInput(i, e)}
                      innerRef={methods.register}
                    >
                      <option>Class A</option>
                      <option>Class B</option>
                      <option>None</option>
                    </Input>
                  </td>
                  <td>
                    <Input
                      required
                      type="select"
                      id={"shareType"}
                      name={`shareInfo[${i}].shareType`}
                      value={data[i].shareType}
                      onChange={(e) => handleInput(i, e)}
                      innerRef={methods.register}
                    >
                      <option>Common</option>
                      <option>Preferred</option>
                    </Input>
                  </td>
                  <td>
                    <Input
                      type="number"
                      id={"shareTotal"}
                      name={`shareInfo[${i}].shareTotal`}
                      value={data[i].shareTotal}
                      onChange={(e) => handleInput(i, e)}
                      innerRef={methods.register({
                        required: "Total Shares is Required",
                        min: 1,
                      })}
                    />
                    {errors &&
                      errors[i] &&
                      errors[i].shareTotal &&
                      errors[i].shareTotal.type === "required" && (
                        <p>{errors[i].shareTotal.message}</p>
                      )}
                    {errors &&
                      errors[i] &&
                      errors[i].shareTotal &&
                      errors[i].shareTotal.type === "min" && (
                        <p>There must be at least 1 share</p>
                      )}
                  </td>
                  <td>
                    <div>
                      <Button onClick={() => addShareRow()}>
                        <AddIcon />
                      </Button>{" "}
                      {data.length !== 1 && (
                        <Button
                          onClick={() => {
                            const newData = [...data];
                            const list = [...shareList];
                            newData.splice(i, 1);
                            newData.forEach((row, index) => {
                              if (index >= i) {
                                row.shareID -= 1;
                              }
                            });
                            list.pop();
                            setShareList(list);
                            setData(newData);
                          }}
                        >
                          <RemoveIcon />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
);

export const FoundersTable = React.forwardRef(
  (
    { columns, data, setData, methods, shareData, inputList, setInputList },
    ref
  ) => {
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, getTableBodyProps, headerGroups } = useTable({
      columns,
      data,
    });

    const idata = `shareinfo[${0}]`;
    // const [inputList, setInputList] = useState([

    //   [{ name: idata, index: 0, refID: "1", numHeld: 0 }],
    // ]);

    let errors = methods.formState.errors.founderInfo;

    const handleFounderInput = (e, i) => {
      const { id, value } = e.target;
      const list = [...data];
      if (id === "onBoard") {
        let isChecked = e.target.checked;
        list[i][id] = isChecked;
        setData(list);
      } else {
        list[i][id] = value;
        setData(list);
      }
    };

    const addFounderRow = function () {
      let l = data.length + 1;
      const d = [...data];
      const item = {
        personID: l,
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
      };

      d.push(item);
      addInputField();
      setData(d);
    };

    const addInputField = function () {
      const list = [...inputList];
      const val = [{ name: idata, index: 0, refID: 1, numHeld: 0 }];
      // ?
      list.push(val);
      setInputList(list);
    };

    const handleInput = (e, i, index) => {
      const { id, value } = e.target;
      const list = [...inputList];

      list[i][index][id] = value;
      setInputList(list);
    };
    const handleAddClick = (i, e) => {
      e.preventDefault();
      const list = [...inputList];
      const lastIndex = inputList[i].length - 1;
      list[i].push({
        name: `shareinfo[${list[i][lastIndex].index + 1}]`,
        index: list[i][lastIndex].index + 1,
        refID: list[i][lastIndex].index + 2,
        numHeld: 0,
      });
      setInputList(list);
    };

    const handleRemoveClick = (i, e) => {
      e.preventDefault();
      const pos = [...inputList];
      pos[i][inputList.length - 1].numHeld = 0;
      pos[i].pop();
      setInputList(pos);
    };

    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              <th>Shares Held</th>
              <th colSpan={3}>Personal Information</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {data.map((row, i) => {
            return (
              <tr key={i}>
                <td>
                  {inputList[i].map((x, index) => {
                    return (
                      <div className="shares" key={index}>
                        <Controller
                          name={`founderInfo[${i}][${x.name}][shareID]`}
                          control={methods.control}
                          defaultValue={inputList[i][index].refID}
                          as={
                            <label style={{ paddingTop: 15 }}>
                              ID: {`${inputList[i][index].refID}`}
                            </label>
                          }
                        />

                        <Input
                          name={`founderInfo[${i}][${x.name}][numHeld]`}
                          id={`numHeld`}
                          type="number"
                          value={inputList[i][index].numHeld}
                          onChange={(e) => handleInput(e, i, index)}
                          innerRef={methods.register({
                            min: 0,
                          })}
                        />

                        {errors &&
                          errors[i] &&
                          errors[i].shareinfo &&
                          errors[i].shareinfo[index] &&
                          errors[i].shareinfo[index].numHeld &&
                          errors[i].shareinfo[index].numHeld.type === "min" && (
                            <p>
                              Number of held shares must be a natural number
                            </p>
                          )}
                      </div>
                    );
                  })}
                  <div className="btn-box">
                    {shareData.length !== inputList[i].length && (
                      <button
                        className="mr10"
                        onClick={(e) => handleAddClick(i, e)}
                      >
                        <AddIcon />
                      </button>
                    )}
                    {inputList[i].length !== 1 && (
                      <button
                        className="mr10"
                        onClick={(e) => handleRemoveClick(i, e)}
                      >
                        <RemoveIcon />
                      </button>
                    )}
                  </div>
                </td>

                <td>
                  <Input
                    type="text"
                    id="fname"
                    name={`founderInfo[${i}][fname]`}
                    placeholder="Full Name"
                    value={data[i].fname}
                    onChange={(e) => handleFounderInput(e, i)}
                    innerRef={methods.register({
                      required: "Full Name Required",
                    })}
                  />

                  {errors && errors[i] && errors[i].fname && (
                    <p>{errors[i].fname.message}</p>
                  )}

                  <Input
                    type="text"
                    id="preferredName"
                    name={`founderInfo[${i}][preferredName]`}
                    placeholder="Preferred Name"
                    value={data[i].preferredName}
                    onChange={(e) => handleFounderInput(e, i)}
                    innerRef={methods.register}
                  />

                  <input
                    type="checkbox"
                    id="onBoard"
                    name={`founderInfo[${i}][onBoard]`}
                    checked={data[i].onBoard}
                    onChange={(e) => handleFounderInput(e, i)}
                    ref={methods.register}
                  />
                  <label>On Board of Directors?</label>
                </td>

                <td>
                  <Input
                    type="tel"
                    id="phone"
                    name={`founderInfo[${i}][phone]`}
                    value={data[i].phone}
                    placeholder="Phone number"
                    onChange={(e) => handleFounderInput(e, i)}
                    innerRef={methods.register({
                      required: "Phone Number is Required",
                      pattern:
                        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                    })}
                  />

                  {errors &&
                    errors[i] &&
                    errors[i].phone &&
                    errors[i].phone.type === "required" && (
                      <p>{errors[i].phone.message}</p>
                    )}

                  {errors &&
                    errors[i] &&
                    errors[i].phone &&
                    errors[i].phone.type === "pattern" && (
                      <p>Please enter valid phone number</p>
                    )}

                  <Input
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    name={`founderInfo[${i}][email]`}
                    value={data[i].email}
                    onChange={(e) => handleFounderInput(e, i)}
                    innerRef={methods.register}
                  />

                  <Input
                    type="select"
                    id="role"
                    name={`founderInfo[${i}][role]`}
                    value={data[i].role}
                    onChange={(e) => handleFounderInput(e, i)}
                    innerRef={methods.register}
                  >
                    <option>Founder</option>
                    <option>Investor</option>
                  </Input>
                </td>

                <td>
                  <Input
                    type="text"
                    id="streetName"
                    name={`founderInfo[${i}][streetName]`}
                    placeholder="Street Name"
                    value={data[i].streetName}
                    onChange={(e) => handleFounderInput(e, i)}
                    innerRef={methods.register}
                  />

                  <Input
                    type="text"
                    id="cityName"
                    name={`founderInfo[${i}][cityName]`}
                    value={data[i].cityName}
                    onChange={(e) => handleFounderInput(e, i)}
                    placeholder="City"
                    innerRef={methods.register}
                  />

                  <Input
                    type="select"
                    id="provinceName"
                    name={`founderInfo[${i}][provinceName]`}
                    value={data[i].provinceName}
                    onChange={(e) => handleFounderInput(e, i)}
                    placeholder="Province"
                    innerRef={methods.register}
                  >
                    <option value="AB">Alberta</option>
                    <option value="BC">British Columbia</option>
                    <option value="MB">Manitoba</option>
                    <option value="NB">New Brunswick</option>
                    <option value="NL">Newfoundland and Labrador</option>
                    <option value="NS">Nova Scotia</option>
                    <option value="ON">Ontario</option>
                    <option value="PE">Prince Edward Island</option>
                    <option value="QC">Quebec</option>
                    <option value="SK">Saskatchewan</option>
                    <option value="NT">Northwest Territories</option>
                    <option value="NU">Nunavut</option>
                    <option value="YT">Yukon</option>
                  </Input>

                  <Input
                    type="text"
                    id="postalCode"
                    name={`founderInfo[${i}][postalCode]`}
                    placeholder="Postal Code"
                    value={data[i].postalCode}
                    onChange={(e) => handleFounderInput(e, i)}
                    innerRef={methods.register}
                  />
                </td>

                <td>
                  <div>
                    <Controller
                      name={`founderInfo[${i}].personID`}
                      control={methods.control}
                      defaultValue={data[i].personID}
                    />
                    <Button onClick={() => addFounderRow()}>
                      <AddIcon />
                    </Button>{" "}
                    {data.length !== 1 && (
                      <Button
                        onClick={() => {
                          const newData = [...data];
                          newData.splice(i, 1);
                          newData.forEach((row, index) => {
                            if (index >= i) {
                              row.personID -= 1;
                            }
                          });
                          inputList.splice(i, 1);
                          setData(newData);
                        }}
                      >
                        <RemoveIcon />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
);

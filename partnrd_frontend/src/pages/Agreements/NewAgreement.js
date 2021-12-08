import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import SLUGS from "../../resources/slugs";

export function NewAgreement() {
  const methods = useForm();
  const { push } = useHistory();

  const onSubmit = (data) => {
    // console.log(JSON.stringify(data, null, 2));
    localStorage.setItem("data", JSON.stringify(data));
    push(SLUGS.shareAgreement);
  };

  return (
    <div>
      <form className="smallForm" onSubmit={methods.handleSubmit(onSubmit)}>
        <h2>Create Agreement</h2>
        <FormGroup>
          <label>Agreement Name</label>
          <Input
            required
            type="text"
            name="agreeName"
            innerRef={methods.register}
          />
        </FormGroup>
        <FormGroup>
          <label>Template</label>
          <Input
            required
            type="select"
            name="tempType"
            innerRef={methods.register}
          >
            <option>Share Agreement</option>
          </Input>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              id="readTerms"
              name="readTerms"
              innerRef={methods.register}
            />{" "}
            I have read and accept the <a href={SLUGS.terms}> Terms and Conditions</a>.
          </Label>
        </FormGroup>
        <button type="submit">Create Agreement</button>
      </form>
    </div>
  );
}

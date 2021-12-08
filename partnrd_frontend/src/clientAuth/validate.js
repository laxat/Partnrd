export default function validate(values)
{
    let errors = {};

    if (!values.name.trim())
    {
        errors.name = "Name required"; 
    }

    if (!values.email)
    {
        errors.email = "Email Required"; 
        
    } else if (!/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0 - 5] | 2[0 - 4][0 - 9] | 1[0 - 9]{ 2} | [0 - 9]{ 1, 2}) \.) { 2 } (25[0 - 5] | 2[0 - 4][0 - 9] | 1[0 - 9]{ 2 }| [0 - 9]{ 1, 2 }) \]?$) /i.test(values.email))
        {
        errors.email = "Email address is invalid"; 
    }
    

    if (!values.password) {
        errors.password = 'Password Required'; 
    } else if (values.password.length < 8) {
        errors.password = 'Password needs to be a 8 characters or more'; 
    }

    if (!values.password2) {
        errors.password2 = 'Password is required';
    } if (values.password !== values.password2) {
        errors.password2 = 'Password does not match'; 
    }

    return errors; 
}
export function LoginValidate(values)  {

     let errors = {};

  if (!values.email) {
    errors.email = "Email Required";
  } else if (
    !/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0 - 5] | 2[0 - 4][0 - 9] | 1[0 - 9]{ 2} | [0 - 9]{ 1, 2}) \.) { 2 } (25[0 - 5] | 2[0 - 4][0 - 9] | 1[0 - 9]{ 2 }| [0 - 9]{ 1, 2 }) \]?$) /i.test(
      values.email
    )
  ) {
    errors.email = "Email address is invalid";
  }

  if (!values.password) {
    errors.password = "Password Required";
  }
    
    return errors; 
}


export function ResetValidate(values)
{
    let errors = {};
    
    if (!values.password) {
      errors.password = "Password Required";
    } else if (values.password.length < 8) {
      errors.password = "Password needs to be a 8 characters or more";
    }

    if (!values.password_confirmation) {
      errors.password_confirmation = "Password is required";
    }
    if (values.password !== values.password_confirmation) {
      errors.password2 = "Password does not match";
    }

    return errors;
    
}

export function ForgotValidate(values)
{
    let errors = {};

        if (!values.email) {
          errors.email = "Email Required";
        } else if (
          !/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0 - 5] | 2[0 - 4][0 - 9] | 1[0 - 9]{ 2} | [0 - 9]{ 1, 2}) \.) { 2 } (25[0 - 5] | 2[0 - 4][0 - 9] | 1[0 - 9]{ 2 }| [0 - 9]{ 1, 2 }) \]?$) /i.test(
            values.email
          )
        ) {
          errors.email = "The selected email is invalid";
    }
    
    return errors; 
}; 



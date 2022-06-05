import React from "react";
import "./FormErrors.css";

export const FormErrors = ({ formErrors }) => (
  <div className="errors">
    {Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <p key={i} className="error_elem">
            {formErrors[fieldName]}
          </p>
        );
      } else {
        return "";
      }
    })}
  </div>
);
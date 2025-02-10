import React from "react";
import { Link } from "react-router-dom";

function PaymentSuccess() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Thank You</title>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n      body {\n        background-color: #f5e5cc;\n      }\n    ",
        }}
      />
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="col-md-4">
          <div className="border border-3 border-warning" />
          <div className="card bg-white shadow p-5">
            <div className="mb-4 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-warning"
                width={75}
                height={75}
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
              </svg>
            </div>
            <div className="text-center">
              <h1>Thank You !</h1>
              <p>Your order has been placed successfully.</p>
              {/*Link To Home when Connecting Project*/}
              <Link to="/" className="btn btn-outline-dark">
                {" "}
                Back Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccess;

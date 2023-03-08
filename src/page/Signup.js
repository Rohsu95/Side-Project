import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <div>
        <h1>Sign up</h1>
        <Link to="/login">
          <p>Have an account?</p>
        </Link>
      </div>
      <div>
        <form>
          <input></input>
          <input></input>
          <input></input>
          <button>Sign up</button>
        </form>
      </div>
    </div>
  );
};
export default Signup;

import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../../styles/Theme";
const Container = styled.div``;
const SignupLink = styled(Link)`
  text-decoration: none;
  color: ${theme.colors.main};
`;
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

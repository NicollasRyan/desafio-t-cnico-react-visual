import { CardUser } from "../components/CardUser";
import { Container } from "../components/Container";

export function UserList() {
  return (
    <Container>
      <h1>User List</h1>
      <div>
        <CardUser />
        <CardUser />
        <CardUser />
        <CardUser />
      </div>
    </Container>
  );
}
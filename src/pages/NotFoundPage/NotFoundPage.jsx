import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h2>404 - Page not found</h2>
      <Link to="/">Go to homepage</Link>
    </div>
  );
}

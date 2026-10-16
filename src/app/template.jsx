// Unlike a layout, a template is created again on every navigation,
// so this fade-in plays each time the customer opens a new page.
export default function Template({ children }) {
  return <div className="page-in">{children}</div>;
}

import { Tab, Tabs } from "react-bootstrap";
import ReportForm from "./ReportForm";
import ReportFormIFrame from "./ReportFormIFrame";

const ReportPage = () => {
  return (
    <div className="container mt-4">
      <Tabs defaultActiveKey="form" id="report-tabs" className="mb-3">
        <Tab eventKey="form" title="Purchase Report">
          <ReportForm />
        </Tab>

        <Tab eventKey="iframe" title="Overdue Report">
          <ReportFormIFrame />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ReportPage;

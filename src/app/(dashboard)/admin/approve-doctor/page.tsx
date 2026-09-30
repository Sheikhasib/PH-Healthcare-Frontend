import DoctorApprovalTabs from "@/components/modules/doctor-approval/doctor-approval-tabs";

const ApproveDoctorPage = () => {
  return (
    <section className="p-5">
      <div>
        <h1> Doctor approval </h1>
        <p>Please review and make sure the given data is real.</p>
      </div>
      <DoctorApprovalTabs />
    </section>
  );
};

export default ApproveDoctorPage;

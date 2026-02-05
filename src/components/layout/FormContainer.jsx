import PersonalForm from "../form/PersonalForm";
import EducationForm from "../form/EducationForm";
import SkillsForm from "../form/SkillsForm";
import ProjectsForm from "../form/ProjectsForm";
import ExperienceForm from "../form/ExperienceForm";
import CertificationsForm from "../form/CertificationsForm";
import HobbiesForm from "../form/HobbiesForm";


export default function FormContainer() {
  return (
    <div className="p-5 space-y-6">
      <PersonalForm />
      <EducationForm />
      <SkillsForm />
      <ProjectsForm />
      <ExperienceForm />
      <CertificationsForm />
      <HobbiesForm />

    </div>
  );
}
    
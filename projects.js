const inputProject = document.getElementById("project-input");
const inputProjectName = document.getElementById("project-name");
const inputStartDate = document.getElementById("date-start");
const inputEndDate = document.getElementById("date-end");
const inputProjectDesc = document.getElementById("project-description");
const inputUseNodeJS = document.getElementById("node-js");
const inputUseReactJS = document.getElementById("react-js");
const inputUseNextJS = document.getElementById("next-js");
const inputUseTypeScript = document.getElementById("typescript");
const inputUploadImage = document.getElementById("upload-image");

document.addEventListener("DOMContentLoaded", () => {
  inputProject.addEventListener("submit", (event) => {
    event.preventDefault();
    addProject();
    alert("Project has been added");
    inputProject.reset();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

const addProject = () => {
  const id = generateID();
  const projectName = inputProjectName.value;
  const startDate = inputStartDate.value;
  const endDate = inputEndDate.value;
  const projectDesc = inputProjectDesc.value;
  const useNodeJS = inputUseNodeJS.checked;
  const useReactJS = inputUseReactJS.checked;
  const useNextJS = inputUseNextJS.checked;
  const useTypeScript = inputUseTypeScript.checked;

  const uploadImage = URL.createObjectURL(inputUploadImage.files[0]);

  const project = {
    id,
    projectName,
    startDate,
    endDate,
    projectDesc,
    useNodeJS,
    useReactJS,
    useNextJS,
    useTypeScript,
    uploadImage,
  };

  dataProject.push(project);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
};

// displaying project
document.addEventListener(RENDER_EVENT, () => {
  const listProject = document.getElementById("project-list");

  listProject.innerHTML = "";

  for (const project of dataProject) {
    const projectItem = createProjectItem(project);
    listProject.append(projectItem);
  }
});

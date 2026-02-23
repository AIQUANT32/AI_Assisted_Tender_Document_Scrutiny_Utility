const departmentCodes = {
  "Public Works Department": "PWD",
  "Urban Development Department": "UDD",
  "Health Department": "HD",
  "Education Department": "ED",
  "Energy Department": "ENG",
  "Transport Department": "TD",
  "IT Department": "ITD",
  "Procurement Department": "PD",
  "Municipal Corporation": "MC",
  "Infrastructure Development Corporation": "IDC"
};

const Tender = require("../repo/tender.repo");

const generateTenderId = async (department) => {
    const year = new Date().getFullYear();
    const deptCode = departmentCodes[department];

    if(!deptCode){
        throw new Error("Invalid Department");
    }

    const regexPattern = new RegExp(`^${deptCode}-${year}-`);

    const count = await Tender.countTenderByDepartment(
        regexPattern,
        department
    )
    console.log(count);

    const nextNum = count+1;
    const padded = String(nextNum).padStart(4,"0");

    const tenderId = `${deptCode}-${year}-${padded}`;

    return tenderId;
}

module.exports = generateTenderId;
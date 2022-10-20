const { sectionCreate, sectionDelete, sectionRead, sectionUpdate } = require('../service/sections')

// newSecData = {id: 0, name: '', index: 1}
const createSections = async (newSecData) => {
  await sectionCreate(newSecData);
  const sections = await sectionRead();
  return sections;
};

const getSections = async () => {
  const sections = await sectionRead();

  return sections;
}

// updatedSection = {id: 0, name: '', index: 1}
const updateSections = async (updatedSection) => {
  await sectionUpdate(updatedSection);
  const sections = await sectionRead();

  return sections;
}


// deletedSection = {id: 0, name: '', index: 1}
const deleteSections = async (deletedSection) => {
  await sectionDelete(deletedSection);
  const sections = await sectionRead();

  return sections;
}


module.exports = { createSections, deleteSections, getSections, updateSections };
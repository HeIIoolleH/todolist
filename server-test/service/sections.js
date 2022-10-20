const db = require('../models/index');
const Sections = db.Sections;

// newSecData = {id: 0, name: '', index: 1}
const sectionCreate = async (newSecData) => {
  try {
    await Sections.create({
      name: newSecData.sectionName,
      index: newSecData.index,
    });
  } catch (e) {
    console.error(e);
  }
};

// deletedSection = {id: 0, name: '', index: 1}
const sectionDelete = async (deletedSection) => {
  await Sections.destroy({
    where: {
      id: deletedSection.id
    }
  });
};

const sectionRead = async () => {
  const sectionAll = await Sections.findAll();

  return sectionAll;
}

// updatedSection = {id: 0, name: '', index: 1}
const sectionUpdate = async (updatedSection) => {
  await Sections.update(updatedSection, {
    where: {
      id: updatedSection.id
    }
  })
};

module.exports = { sectionCreate, sectionDelete, sectionRead, sectionUpdate };
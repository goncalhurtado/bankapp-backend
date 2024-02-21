let alias = "";
let cvu = "";

const generateAlias = (name, lastname) => {
  name = name.replace(/\s/g, "").toLowerCase();
  lastname = lastname.replace(/\s/g, "").toLowerCase();
  alias = `${name}.${lastname}.fakebank`;
  return alias;
};

const generateCvu = (email) => {
  let numeroBase = email
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  let numeroAleatorio =
    Math.floor(Math.random() * (9999999999999 - 1000000000000 + 1)) +
    1000000000000;

  cvu = numeroBase + numeroAleatorio;

  cvu = String(cvu).substring(0, 13);

  return cvu;
};

module.exports = {
  generateAlias,
  generateCvu,
};

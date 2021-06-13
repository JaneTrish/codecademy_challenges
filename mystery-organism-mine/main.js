// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// My code below
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      let random = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[random] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[random] = newBase;
      return this.dna;
    },
    compareDNA(comparedObject) {
      let identicalBases = 0;
      for (i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === comparedObject.dna[i]) {
          identicalBases++;
        }
      }
      //console.log(identicalBases);
      const percentage = ((identicalBases / this.dna.length) * 100).toFixed(2);
      console.log(
        `Specimen #${this.specimenNum} and specimen #${comparedObject.specimenNum} have ${percentage}% DNA in common`
      );
    },
    willLikelySurvive() {
      let goodGenes = 0;
      for (i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'G' || this.dna[i] === 'C') {
          goodGenes++;
        }
      }
      //console.log(goodGenes);
      const goodPercentage = (goodGenes / this.dna.length) * 100;
      return goodPercentage >= 60;
    },
  };
};

//Function producing 30 instances of factory function, for which .willLikelySurvive() returns true
function survivors() {
  const willLive = [];
  let num = 1;
  let org = pAequorFactory(num, mockUpStrand());
  while (num < 31) {
    org = pAequorFactory(num, mockUpStrand());
    if (org.willLikelySurvive()) {
      willLive.push(org);
    } else {
      while (org.willLikelySurvive()) {
        org.mutate();
      }
      willLive.push(org);
    }
    num++;
  }
  return willLive;
}

const newOrg = pAequorFactory(1, mockUpStrand());
console.log(newOrg.dna);

const mutatedOrg = newOrg.mutate();
console.log(mutatedOrg);
const orgTwo = pAequorFactory(2, mockUpStrand());
console.log(orgTwo.dna);
newOrg.compareDNA(orgTwo);

console.log(newOrg.willLikelySurvive());

console.log(survivors());

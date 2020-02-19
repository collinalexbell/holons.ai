import Objective from "../../src/common/Objective";
import KeyResult, {KeyResultInMem} from "../../src/common/KeyResult";

describe('Objective', () => {
  let objective: Objective;
  beforeEach(() => {
    objective = new Objective( 'test')
  });
  it('should be creatable', () => {
    expect(objective).not.toBeNull();
  });
  it('should have a description', () => {
    expect(objective.description).toBeTruthy();
  });
  describe('with keyResults', () => {
    const krs: KeyResult[] = [
      new KeyResultInMem(0, 0.3, "example"),
      new KeyResultInMem(1, 0.7, "example2")
    ];
    beforeEach(() => {
      objective.addKR(krs[0]);
      objective.addKR(krs[1]);
    });
    describe('getKRs', () => {
      it('should return the KRs I add', () => {
        expect(objective.getKRs()[0]).toBe(krs[0]);
        expect(objective.getKRs()[1]).toBe(krs[1]);
      });
    });

    describe('removeKR', () => {
      it('should remove kr so it isnt returned by getKRs', () => {
        objective.removeKR(krs[0]);
        expect(objective.getKRs()[0]).toBe(krs[1]);
      });
    });
    describe('score', () => {
      it('should compute the average of all the KRs scores', () => {
        expect(objective.score()).toBeCloseTo(0.5, 2);
        objective.addKR(new KeyResultInMem(200, 1, 'perfect'));
        expect(objective.score()).toBeCloseTo(0.666, 2)
      });
    });
  });
});

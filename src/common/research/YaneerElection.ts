import {EventLoopDelayMonitor} from "perf_hooks";

declare const Calculess: any;
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
//@ts-ignore
import Calculess from 'calculess';

const NUM_R_SUMS = 500;
const TRANSLATIONAL_INVARIANCE_STEPS = 5000;
const TRANSLATIONAL_INVARIANCE_MARGIN = 0.01;

const roughlyEqual = (margin: number, x: number, y: number): boolean => Math.abs(x-y) < margin;

// Calculess is not typescript. Extract integral function and type it.
const integral: (start: number, end: number , fn: (x: number) => number , numSubintervals: number) => number =
    Calculess.Calc.integral;

const limAt: (x: number, fn: (x: number) => number) => number =
    Calculess.Calc.limAt;

type PoliticalOpinion = number;
type PoliticalDomain = [PoliticalOpinion, PoliticalOpinion];
class OpinionDist {
  f: (x: PoliticalOpinion) => number;
  domain: PoliticalDomain;

  constructor(f: (x: PoliticalOpinion) => number, domain: PoliticalDomain) {
    this.f = f;
    this.domain = domain;
  }

  withC(c: number): OpinionDist {
    return Object.assign({}, this, {f: (x: number) => this.f(x + c)})
  };
}

type Election = (dist: OpinionDist) => PoliticalOpinion;

function translationalInvarianceHolds (election: Election, dist: OpinionDist): boolean {
  const min = dist.domain[0];
  const max = dist.domain[1];
  const step = (min - max)/TRANSLATIONAL_INVARIANCE_STEPS;

  for(let c = min; c <= max; c += step) {
    if(!roughlyEqual(TRANSLATIONAL_INVARIANCE_MARGIN, election(dist.withC(c)) + c, election(dist))) {
      return false
    }
  }
  return true
}

const numCitizensInOpinionInterval = (dist: OpinionDist, a: PoliticalOpinion, b: PoliticalOpinion): number =>
    integral(a, b, dist.f, NUM_R_SUMS);

function representation(e: Election, dist: OpinionDist, opinion: PoliticalOpinion) {

  const ofChangeC = (c: number): number => (dist.f(opinion) - dist.withC(c).f(opinion)) / c;

  limAt(0, ofChangeC);
}


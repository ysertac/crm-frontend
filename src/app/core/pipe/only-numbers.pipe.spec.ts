import { OnlyNumbersPipe } from './only-numbers.pipe';

describe('OnlyNumbersPipe', () => {
  it('create an instance', () => {
    const pipe = new OnlyNumbersPipe();
    expect(pipe).toBeTruthy();
  });
});

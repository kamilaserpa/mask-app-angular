import { NumberMaskPipe } from './number-mask.pipe';

describe('NumberMaskPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberMaskPipe();
    expect(pipe).toBeTruthy();
  });
});

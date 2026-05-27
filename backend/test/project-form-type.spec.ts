import { ProjectFormType } from '../src/project-forms/project-form-type.enum';

describe('ProjectFormType', () => {
  it('defines the four supported project form types', () => {
    expect(Object.values(ProjectFormType)).toEqual([
      'software',
      'ecommerce',
      'research',
      'infrastructure',
    ]);
  });
});

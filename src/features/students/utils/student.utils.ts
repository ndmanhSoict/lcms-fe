import type { Student, Parent } from '../types/student.types';

export function getStudentName(person: Pick<Student | Parent, 'fullName' | 'full_name'>): string {
    return person.fullName || person.full_name || '';
}

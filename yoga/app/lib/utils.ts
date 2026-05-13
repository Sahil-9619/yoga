export const cn = (...classes: any[]) => classes.filter(c => typeof c === 'string' && c).join(' ');

import type { Publication } from './site';

export type PublicationKind = 'conference' | 'journal';

// Retain support for older backups that predate explicit publication categories.
export function publicationKind(publication: Publication): PublicationKind {
  if (publication.type === 'conference' || publication.type === 'journal') return publication.type;
  return /journal|transactions|letters/i.test(publication.venue) ? 'journal' : 'conference';
}

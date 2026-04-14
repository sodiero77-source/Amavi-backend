export interface RequestActorContext {
  actorId: string;
  actorRole: 'ADMIN' | 'SUPERVISOR' | 'CLINICIAN' | 'MEDTECH' | 'STAFF';
  facilityId: string;
  requestId: string;
}

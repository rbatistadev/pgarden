type WorkSessionMetadata = {
  ip?: string;
  device?: string;
  geo?: { lat: number; lon: number };
};

export class WorkSessionMetadataVo {
  constructor(private props: WorkSessionMetadata) {}

  toJSON(): WorkSessionMetadata {
    return this.props;
  }
}

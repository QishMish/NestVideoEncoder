import { Job } from 'bull';

interface JobProducerInterface<T> {
  add: (videoJob: T) => Promise<Job<T>>;
}

export { JobProducerInterface };

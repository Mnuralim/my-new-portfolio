interface AdminSessionPayload {
  adminId: string;
  email: string;
  expiresAt: Date;
}

interface FormState<T = unknown> {
  success?: string | null;
  error?: string | null;
  formData?: FormData;
  data?: T;
}

interface PaginationParams {
  take?: string;
  skip?: string;
  sortBy?: string;
  sortOrder?: string;
}

interface SkillParams extends PaginationParams {
  search?: string;
}

interface ExperienceParams extends PaginationParams {
  search?: string;
}

interface ProjectParams extends PaginationParams {
  search?: string;
}

interface ServiceParams extends PaginationParams {
  search?: string;
}

interface ContactLinkParams extends PaginationParams {
  search?: string;
}

interface BlogPostParams extends PaginationParams {
  search?: string;
}

interface PlaylistParams extends PaginationParams {
  search?: string;
}

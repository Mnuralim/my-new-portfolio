import { getAllSkillsRaw } from "@/actions/skill";
import { getAllExperiencesRaw } from "@/actions/experience";
import { getAllProjectsRaw } from "@/actions/project";
import { getAllServicesRaw } from "@/actions/service";
import { getAllContactLinksRaw } from "@/actions/contact-link";
import { getAllBlogPostsRaw } from "@/actions/blog-post";
import { getAllPlaylistsRaw } from "@/actions/playlist";
import type {
  Skill,
  Experience,
  Project,
  Service,
  ContactLink,
  BlogPost,
  Playlist,
} from "../../types";

export async function getSkills(): Promise<Skill[]> {
  const skills = await getAllSkillsRaw();
  return skills.map((s) => ({ category: s.category, name: s.name }));
}

export async function getExperiences(): Promise<Experience[]> {
  const experiences = await getAllExperiencesRaw();
  return experiences.map((e) => ({
    num: e.num,
    period: e.period,
    company: e.company,
    type: e.type as Experience["type"],
    role: e.role,
    description: e.description,
    tags: e.tags as string[],
  }));
}

export async function getProjects(): Promise<Project[]> {
  const projects = await getAllProjectsRaw();
  return projects.slice(0, 3).map((p) => ({
    num: p.num,
    tag: p.tag,
    tagColor: p.tagColor as Project["tagColor"],
    title: p.title,
    description: p.description,
    stack: p.stack as string[],
    href: p.href,
    featured: p.featured,
  }));
}

export async function getAllProjectsForModal(): Promise<
  (Project & { filter: string })[]
> {
  const projects = await getAllProjectsRaw();
  return projects.map((p) => ({
    num: p.num,
    tag: p.tag,
    tagColor: p.tagColor as Project["tagColor"],
    title: p.title,
    description: p.description,
    stack: p.stack as string[],
    href: p.href,
    featured: p.featured,
    filter: p.filter ?? "",
  }));
}

export async function getServices(): Promise<Service[]> {
  const services = await getAllServicesRaw();
  return services.map((s) => ({
    icon: s.icon,
    title: s.title,
    description: s.description,
  }));
}

export async function getContactLinks(): Promise<ContactLink[]> {
  const contactLinks = await getAllContactLinksRaw();
  return contactLinks.map((c) => ({ label: c.label, href: c.href }));
}

export async function getLatestPosts(): Promise<BlogPost[]> {
  const posts = await getAllBlogPostsRaw();
  return posts.map((p) => ({
    num: p.num,
    tag: p.tag,
    tagColor: p.tagColor as BlogPost["tagColor"],
    title: p.title,
    description: p.description,
    date: p.date,
    readTime: p.readTime,
    views: p.views,
    href: `/blog/${p.slug}`,
    featured: p.featured,
  }));
}

export async function getPlaylists(): Promise<Playlist[]> {
  const playlists = await getAllPlaylistsRaw();
  return playlists.map((p) => ({
    name: p.name,
    slug: p.slug,
    description: p.description,
    coverImage: p.coverImage,
    href: `/playlist/${p.slug}`,
    postCount: p._count.posts,
  }));
}

export const stats = [
  { num: "1+", label: "YEARS EXP" },
  { num: "10+", label: "PROJECTS DONE" },
  { num: "100%", label: "PROBLEM SOLVED" },
];

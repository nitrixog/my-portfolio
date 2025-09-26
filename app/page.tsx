"use client";

import React, { useState, useEffect } from 'react';
import { Github, Mail, ExternalLink, Shield, Network, Brain, MapPin, Home } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dock, DockIcon } from '@/components/ui/dock';
import { Particles } from '@/components/ui/particles';
import { TextAnimate } from '@/components/ui/text-animate';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const Portfolio = () => {
const [isLoaded, setIsLoaded] = useState(false);
const [activeTab, setActiveTab] = useState('projects');
const [isLoading, setIsLoading] = useState(false);

type GitHubAPIRepo = {
  name: string;
  description: string | null;
  html_url: string;
  topics: string[];
  stargazers_count: number;
};

type GitHubProject = {
  title: string;
  description: string | null;
  url: string;
  tech: string[];
  stars: number;
};

const [projects, setProjects] = useState<GitHubProject[]>([]);

useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoaded(true);
  }, 100);
  return () => clearTimeout(timer);
}, []);

useEffect(() => {
  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://api.github.com/users/nitrixOG/repos?sort=updated&per_page=6"
      );

      if (!res.ok) throw new Error("Failed to fetch repos");

      const data: GitHubAPIRepo[] = await res.json();

      const formatted: GitHubProject[] = data.map((repo) => ({
        title: repo.name,
        description: repo.description,
        url: repo.html_url,
        tech: repo.topics.length ? repo.topics : ["Write-up"],
        stars: repo.stargazers_count,
      }));

      setProjects(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  fetchProjects();
}, []);

const skills = {
  "Reverse Engineering": ["IDA Pro", "x64dbg", "Cheat Engine"],
  "Networking": ["Wireshark", "Nmap", "BGP", "RIPE", "AS56971"], // one tree tree seven
  "AI/ML": ["PyTorch", "TensorFlow", "CUDA", "OpenCV"],
  "Languages": ["Python", "C/C++", "Go", "TypeScript"]
};

return (
  <div className="dark min-h-screen bg-background relative overflow-x-hidden">
    <style jsx global>{`
      ::-webkit-scrollbar {
        display: none;
      }
      * {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `}</style>
    <Particles
      className="absolute inset-0 z-0"
      quantity={100}
      ease={80}
      color="#ffffff"
      refresh
    />
    
    <div className={`relative z-10 max-w-3xl mx-auto p-4 space-y-6 transition-all duration-1000 ${
      isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      
      <div className={`relative transition-all duration-700 delay-200 ${
        isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        
        <div className="relative text-center space-y-4 py-8">
          <div className={`relative w-20 h-20 mx-auto transition-all duration-500 delay-300 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}>
            <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse" />
            <img 
              src="https://files.catbox.moe/ubocet.png" // yes, i am aware there is a much better way to do this, no, i will not be changing it
              className="relative w-20 h-20 rounded-full border-2 border-white/20 object-cover"
            />
          </div>
          
          <div className={`space-y-2 transition-all duration-500 delay-400 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h1 className="text-3xl font-bold text-white">
              <TextAnimate animation="blurInUp" by="character" once>
                {"nitrix"}
              </TextAnimate>
            </h1>

            <p className="text-muted-foreground text-white">
              <TextAnimate animation="blurInUp" by="word" once>
                {"Network & Reverse Engineer"}
              </TextAnimate>
            </p>

            <div className="flex justify-center items-center text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Jacksonville, FL
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`grid md:grid-cols-3 gap-3 transition-all duration-700 delay-600 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}>
        <Card className="group border-white/10">
          <CardContent className="p-4 text-center">
            <Shield className="w-6 h-6 mx-auto mb-2 text-white" />
            <h3 className="font-semibold text-white">Reverse Engineering</h3>
            <p className="text-xs text-muted-foreground mt-1">Malware & game hacking</p>
          </CardContent>
        </Card>

        <Card className="group border-white/10">
          <CardContent className="p-4 text-center">
            <Network className="w-6 h-6 mx-auto mb-2 text-white" />
            <h3 className="font-semibold text-white">Networking</h3>
            <p className="text-xs text-muted-foreground mt-1">Protocol & traffic analysis</p>
          </CardContent>
        </Card>

        <Card className="group border-white/10">
          <CardContent className="p-4 text-center">
            <Brain className="w-6 h-6 mx-auto mb-2 text-white" />
            <h3 className="font-semibold text-white">Artificial Intelligence</h3>
            <p className="text-xs text-muted-foreground mt-1">ML & neural networks</p>
          </CardContent>
        </Card>
      </div>

      <div className="pb-32">
        <div className="relative overflow-hidden">
          <div className={`transition-all duration-500 ease-in-out ${
            activeTab === 'projects' 
              ? 'opacity-100 translate-x-0 pointer-events-auto' 
              : 'opacity-0 translate-x-8 pointer-events-none absolute inset-0'
          }`}>
            <div className="space-y-3">
              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading projects from GitHub...</p>
                </div>
              ) : (
                projects.map((project, index) => (
                  <Card key={index} className="group border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-white">{project.title}</h3>
                        {project.url && (
                          <a href={project.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <ExternalLink className="h-3 w-3 text-white" />
                            </Button>
                          </a>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.tech.map((tech, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-white/20 text-white">
                            {tech}
                          </Badge>
                        ))}
                        {project.stars > 0 && (
                          <Badge variant="outline" className="text-xs border-white/20 text-white">
                            ⭐ {project.stars}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          <div className={`transition-all duration-500 ease-in-out ${
            activeTab === 'skills' 
              ? 'opacity-100 translate-x-0 pointer-events-auto' 
              : 'opacity-0 translate-x-8 pointer-events-none absolute inset-0'
          }`}>
            <div className="space-y-3">
              {Object.entries(skills).map(([category, skillList]) => (
                <Card key={category} className="border-white/10">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-white mb-3">{category}</h3>
                    <div className="flex flex-wrap gap-1">
                      {skillList.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs bg-white/5 border-white/20 text-white"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[9999] pointer-events-auto">
      <TooltipProvider>
        <Dock direction="middle">
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setActiveTab('projects')}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full",
                    activeTab === 'projects' && "bg-white/10"
                  )}
                >
                  <Home className="size-4 text-white" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Projects</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
                
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setActiveTab('skills')}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full",
                    activeTab === 'skills' && "bg-white/10"
                  )}
                >
                  <Brain className="size-4 text-white" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Skills</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
                
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://github.com/nitrixOG" // idk why im hardcoding this again
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full"
                  )}
                >
                  <Github className="size-4 text-white" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>GitHub</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
                
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="mailto:nitrix@cocaine.ninja"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full"
                  )}
                >
                  <Mail className="size-4 text-white" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Email</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  </div>
);
};

export default Portfolio;
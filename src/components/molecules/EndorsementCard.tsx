"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { mockEndorsements } from "@/lib/mockData";
import type { Endorsement } from "@/types";
import { Skeleton } from '../atoms/skeleton';

function getRandomActiveEndorsement(): Endorsement | null {
  const activeEndorsements = mockEndorsements.filter(e => e.status === 'active');
  if (activeEndorsements.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * activeEndorsements.length);
  return activeEndorsements[randomIndex];
}

export function EndorsementCard() {
  const [endorsement, setEndorsement] = useState<Endorsement | null>(null);

  useEffect(() => {
    // This runs only on the client, after hydration, preventing a mismatch.
    setEndorsement(getRandomActiveEndorsement());
  }, []);

  if (!endorsement) {
    // Show a skeleton loader while the client is hydrating or if no endorsement is found.
    return (
      <Card className="my-12 bg-accent/10 border-accent/50">
        <CardHeader>
          <p className="text-sm font-medium text-muted-foreground">Sponsored Content</p>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-6 items-start">
          <Skeleton className="w-full sm:w-1/3 aspect-square rounded-lg shrink-0" />
          <div className="flex-grow space-y-3 w-full">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-10 w-32 mt-2" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="my-12 bg-accent/10 border-accent/50">
      <CardHeader>
        <p className="text-sm font-medium text-muted-foreground">Sponsored Content</p>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="relative w-full sm:w-1/3 aspect-square rounded-lg overflow-hidden shrink-0">
            <Image
              src={endorsement.imageUrl}
              alt={endorsement.productName}
              layout="fill"
              objectFit="cover"
              data-ai-hint={endorsement.dataAiHint || "product advertisement"}
            />
        </div>
        <div className="flex-grow">
          <CardTitle className="font-headline text-2xl mb-2">{endorsement.productName}</CardTitle>
          <p className="text-muted-foreground mb-4">
            {endorsement.description}
          </p>
          <Button asChild>
            <Link href={endorsement.link} target="_blank" rel="noopener noreferrer">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

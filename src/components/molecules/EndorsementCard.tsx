import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function EndorsementCard() {
  return (
    <Card className="my-12 bg-accent/10 border-accent/50">
      <CardHeader>
        <p className="text-sm font-medium text-muted-foreground">Sponsored Content</p>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="relative w-full sm:w-1/3 aspect-square rounded-lg overflow-hidden shrink-0">
            <Image
              src="https://placehold.co/300x300.png"
              alt="Endorsed Product"
              layout="fill"
              objectFit="cover"
              data-ai-hint="product advertisement"
            />
        </div>
        <div className="flex-grow">
          <CardTitle className="font-headline text-2xl mb-2">Check Out This Amazing Product!</CardTitle>
          <p className="text-muted-foreground mb-4">
            This is a special endorsement. We believe this product can bring great value to our readers. Discover more by clicking the button below.
          </p>
          <Button asChild>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

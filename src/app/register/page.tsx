
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-full py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline text-primary">Register</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">Registration functionality has been removed from this application.</p>
          <Button asChild>
            <Link href="/">Go to Home Page</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

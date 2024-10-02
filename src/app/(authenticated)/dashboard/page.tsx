import Header from "@/components/Header/Header";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <Header breadcrumbs={[]} />
      <Card>
        <CardContent className="py-6 text-center">
          Coming Soon
        </CardContent>
      </Card>
    </div>
  );
}

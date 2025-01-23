"use client";
import queryClient from "@/services/tanstackQuery";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;

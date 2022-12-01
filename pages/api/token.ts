// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Cumulio from "cumulio";

// Ideally this should come from the cumulio package and have the full actual types!
export interface Token {
  last_used_at: Date;
  environment: string;
  integration_id: string;
  type: string;
  expiry: Date;
  inactivity_interval: number;
  username: string;
  name: string;
  email: string;
  suborganization: string;
  role: string;
  id: string;
  user_id: string;
  updated_at: Date;
  created_at: Date;
  token: string;
  ip: null;
  securables: null;
  filters: null;
  screenmode: null;
  width: null;
  height: null;
  locale_id: null;
  description: null;
  deleted_at: null;
  metadata: null;
  timezone_id: null;
  theme_id: null;
  theme: null;
  css: null;
  feature_overrides: null;
  currency_id: null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Token>
) {
  var client = new Cumulio({
    api_key: "48dbe6eb-92a7-49eb-9f6f-f5a1e4633adf",
    api_token:
      "bufHdOWxwxSFqQqpeH2s8iy9wHpuE7fKRhwEcMrrzkyY9YhH91z60f6t1csWwdZYYzEgElAfoZngp4doXyNmtULQ6pJnMaYIaUnGVWr2Y1nSYDncwrHE5NjkPDQup7iyryaTt0zPZ3Sdg0RhCSYeql",
    host: "https://api.cumul.io",
  });

  const token = (await client.create("authorization", {
    integration_id: "618a68b6-188d-4ebc-9549-0b093f68db30",
    type: "sso",
    expiry: "24 hours",
    inactivity_interval: "10 minutes",
    username: "ExampleUser",
    name: "Example User",
    email: "example@example.com",
    suborganization: "client1",
    role: "viewer",
  })) as Token;

  res.status(200).json(token);
}

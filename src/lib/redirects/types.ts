export type RedirectStatus = 301 | 302 | 307 | 308;

export type RedirectRule = {
  source: string;
  destination: string;
  type: RedirectStatus;
  enabled: boolean;
  note?: string;
};

type NextRedirectRuleBase = {
  source: string;
  destination: string;
};

export type NextRedirectRule =
  | (NextRedirectRuleBase & {
      permanent: boolean;
    })
  | (NextRedirectRuleBase & {
      statusCode: RedirectStatus;
    });

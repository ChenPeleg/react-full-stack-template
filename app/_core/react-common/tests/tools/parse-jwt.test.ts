import { describe, it, expect } from "vitest";
import { parseJwt } from "../../jwt/pars-jwt";

const jwts = {
  correct1: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibXlOYW1lIn0=.ZKwJdSidhPBGPBLUzpLa3VVag_ENUdTIuGZsel0nN1Y`,
  correct2: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibXlOYW1lIiwiZXhwIjoxMjMxMjMxMiwiYWRtaW4iOnRydWV9.OEDY5vKg15nvWZLw820BxEOqVozfyUSFf0PJUzwgkLE`,
  correctWithUnicode:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIPCfmILwn5it4q2QIiwiaWF0IjoxNTE2MjM5MDIyfQ.tjhuYYj_thn6s8aNJLOcLaeEg6MHikcP1jFhHj9HQYY",
};

describe("parse jwt", () => {
  describe("parseJwt", () => {
    it("should return null if jwt is not provided", () => {
      const result = parseJwt("");
      expect(result).toBeNull();
    });

    it("should return an object when is a valid jwt", () => {
      const result = parseJwt(jwts.correct1);
      expect(typeof result).toBe("object");
    });
    it("should return and object with properties if jwt is valid", () => {
      const result = parseJwt(jwts.correct1);
      // @ts-expect-error testing null
      expect(result.name).toBe("myName");
    });
    it("should return and object with properties if jwt is valid with unicode", () => {
      const result = parseJwt(jwts.correctWithUnicode);
      // @ts-expect-error testing null
      expect(result.name).toBe("John Doe 😂😭⭐");
    });

    it("should return null the decoded jwt if jwt is valid", () => {
      const result = parseJwt(jwts.correct2 + "1");
      expect(result).not.toBeNull();
    });
  });
});

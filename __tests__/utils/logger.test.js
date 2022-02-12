import logger from "../../src/utils/logger";

const spyLog = jest.spyOn(console, "log").mockImplementation();
const spyError = jest.spyOn(console, "error").mockImplementation();

beforeEach(() => {
  spyLog.mockClear();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("Funções de log:", () => {
  it("log", () => {
    logger.log("teste");

    expect(spyLog).toHaveBeenCalledTimes(1);
  });

  it("success", () => {
    logger.success("teste");

    expect(spyLog).toHaveBeenCalledTimes(1);
  });

  it("error", () => {
    logger.error("teste");

    expect(spyError).toHaveBeenCalledTimes(1);
  });
});

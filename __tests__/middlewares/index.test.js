import applyMiddlewares from "middlewares/index.js";

it("Deve retornar uma função a partir de uma cadeia pipe", () => {
  const func1 = jest.fn((identity) => identity);
  const func2 = jest.fn((identity) => identity);

  const chainFunctions = applyMiddlewares(func1, func2);

  expect(chainFunctions).toEqual(expect.any(Function));

  expect(func1).not.toHaveBeenCalled();
  expect(func2).not.toHaveBeenCalled();

  const args = String();
  chainFunctions(args);

  expect(func1).toHaveBeenCalledTimes(1);
  expect(func1).toHaveBeenCalledWith(args);

  expect(func2).toHaveBeenCalledTimes(1);
  expect(func2).toHaveBeenCalledWith(args);
});

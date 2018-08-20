import { expectThrow } from "./helpers/expectThrow";

const BoxFactory = artifacts.require("BoxFactory");

contract("BoxFactory", (accounts) => {
  it("Boxを作成できる", async () => {
    const instance = await BoxFactory.deployed();
    const account = accounts[0];

    let count = await instance.getBoxCount();
    assert.equal(count.valueOf(), 0);
    await instance.createBox(parseInt("FFFFFF", 16), 0, 0);

    count = await instance.getBoxCount();
    assert.equal(count.valueOf(), 1);
  });

  it("同じ座標に同じ人が作る事はできない", async () => {
    const instance = await BoxFactory.deployed();
    const account = accounts[1];

    let count = await instance.getBoxCount({from: account});
    await instance.createBox(parseInt("FFFFFF", 16), 0, 0, {from: account});
    await expectThrow(instance.createBox(parseInt("FFFFFF", 16), 0, 0, {from: account}));

    count = await instance.getBoxCount({from: account});
    assert.equal(count.valueOf(), 1);
  });

  it("自分だけのBoxを取得する事ができる", async () => {
    const instance = await BoxFactory.deployed();
    const account = accounts[2];

    await instance.createBox(parseInt("FFFFFF", 16), 0, 0, {from: account});
    await instance.createBox(parseInt("FFFFFF", 16), 0, 1, {from: account});
    await instance.createBox(parseInt("FFFFFF", 16), 0, 2, {from: account});

    const result = await instance.getBoxes({from: account});
    assert.equal(result.valueOf().length, 4);  // owners, colors, x, y

    const [owners, colors, x, y] = result;
    for (const owner of owners) {
      assert.equal(owner.valueOf(), account);
    }
  });
});

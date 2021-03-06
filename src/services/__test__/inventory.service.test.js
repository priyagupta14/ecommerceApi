const inventoryService = require('../inventory.service');
const { Category, Item } = require('../../models');
const httpUtils = require('../../utils/http.utils');

xdescribe(' Store Categories and Items in DB', () => {
  it('should store categories and items in tables', async () => {
    const mockCat = {
      name: 'shoes',
      itemMetadata: [
        { id: 'shoe_1' },
        { id: 'shoe_2' },
        { id: 'shoe_3' },
        { id: 'shoe_4' },
        { id: 'shoe_5' },
        { id: 'shoe_6' },
        { id: 'shoe_7' },
        { id: 'shoe_8' },
      ],
    };
    const mockItem = {
      features: [{ value: 'Red' },
        { value: 7 },
        { value: 'Nike' },
      ],
    };
    jest.spyOn(httpUtils, 'httpGet').mockResolvedValueOnce(mockCat);
    jest.spyOn(Category, 'create').mockResolvedValue({ idk: 'idk' });
    jest.spyOn(httpUtils, 'httpGet').mockResolvedValueOnce(mockItem);
    jest.spyOn(Item, 'create').mockResolvedValue({ idk: 'idk123' });
    const storedInDb = await inventoryService.storeCategoryItem('shoe');
    console.log(storedInDb);
    // expect(storedInDb).toBe(2);
  });
});

describe('get distinct features based on category', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return Invalid Category', async () => {
    jest.spyOn(Category, 'findOne').mockResolvedValue(null);
    const failCategory = await inventoryService.distinctFeat('abc');
    expect(failCategory).toBe('No Such Category');
  });
  it('should return distinct features based on category', async () => {
    const expectResult = {
      features: {
        size: ['Black'],
        color: ['Black'],
        brand: ['Black'],
      },
    };
    jest.spyOn(Category, 'findOne').mockResolvedValue(true);
    jest.spyOn(Item, 'findAll').mockResolvedValueOnce([{ size: 'Black' }]);
    jest.spyOn(Item, 'findAll').mockResolvedValueOnce([{ color: 'Black' }]);
    jest.spyOn(Item, 'findAll').mockResolvedValueOnce([{ brand: 'Black' }]);
    const receivedResult = await inventoryService.distinctFeat('shoes');
    expect(receivedResult).toEqual(expectResult);
  });
});

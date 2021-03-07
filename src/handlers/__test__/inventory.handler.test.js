const inventoryService = require('../../services/inventory.service');
const inventoryHandler = require('../inventory.handler');

xdescribe('Store category and items in db', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should store data in database along status code 201', async () => {
    const mockRq = { body: { name: ['shoe', 'phone'] } };
  });
});

describe('Get distict feature of particular category', () => {
  it('should get distinct features of particular category', async () => {
    const mockReq = {
      params: { category: 'shoes' },
    };
    const mockExpect = {
      features: {
        size: [
          '5 inches',
        ],
        color: [
          'Black',
        ],
        brand: [
          'Apple',
        ],
      },
    };
    const mockJson = jest.spyOn(inventoryService, 'distinctFeat').mockResolvedValue(mockExpect);
    const mockRes = {
      status: jest.fn(() => ({ json: mockJson })),
    };

    const successResult = await inventoryHandler.distinctFeat(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({ message: mockExpect });
  });
});

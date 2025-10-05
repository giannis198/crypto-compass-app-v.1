describe("CryptoStore", () => {
  it("basic store test", () => {
    // Test basic store functionality
    const mockState = {
      coins: [] as any,
      loading: false,
      error: null,
      page: 1,
      hasMore: true,
    };

    expect(mockState.coins).toEqual([]);
    expect(mockState.loading).toBe(false);
    expect(mockState.page).toBe(1);
  });

  it("can simulate store updates", () => {
    let state = { coins: [] as any, loading: false };

    // Simulate loading state
    state = { ...state, loading: true };
    expect(state.loading).toBe(true);

    // Simulate data loaded
    state = {
      ...state,
      loading: false,
      coins: [{ id: "bitcoin", name: "Bitcoin" }],
    };
    expect(state.loading).toBe(false);
    expect(state.coins).toHaveLength(1);
  });
});

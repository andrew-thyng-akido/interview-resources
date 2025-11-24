# Coffee Order Form - Interview Component

This component is intentionally designed with React/TypeScript anti-patterns for interviewing senior frontend engineers.

## Anti-Patterns Included

### 1. **Redundant State**
- `size` and `coffeeSize` store the same value
- Both are updated when size changes via `handleSizeChange()`

### 2. **Duplicate State**
- `selectedBean` stores the bean ID
- `beanName` stores the bean name (should be derived from beans array)

### 3. **Too Much State**
- `formSubmitted` - not really needed
- `clickCount` - unnecessary tracking
- Multiple loading states that overlap

### 4. **Derived State Set by useEffect**
- `orderReady` is set via useEffect but should be computed directly
- `totalPrice` is calculated in useEffect but should be computed
- `beanName` is set via useEffect but should be derived from beans array

### 5. **Type Use of `any`**
- `OrderSummary` component props use `any` type
- Bean iteration uses `any` type instead of proper interface

### 6. **Misuse of useEffect**
- **BUG**: First useEffect missing `selectedBean` in dependency array (line 50)
- Price calculation useEffect is unnecessary - should be derived
- Bean name useEffect is unnecessary - should be derived

### 7. **Unused Import**
- `React` is imported but not used (line 3)

### 8. **Complicated Inline Logic**
- The `canSubmit` variable (line 103) has complex inline logic that should be extracted to a well-named function

### 9. **Race Condition**
- The beans fetch and loading states create a race condition:
  - `setLoading(true)` at start
  - `setTimeout` sets `loading` to false after 300ms
  - But fetch might take 500ms, causing inconsistent loading state
  - `isLoadingBeans` and `loading` can be out of sync

### 10. **Redundant JSX**
- Two identical "Select Your Coffee" sections (lines 115-123)

### 11. **The Bug That Prevents Proper Functionality**
- The `orderReady` state doesn't update when `selectedBean` changes
- This is because the useEffect is missing `selectedBean` in its dependencies
- Result: "Order Status: Not Ready" even when form is complete

## Expected Improvements

Candidates should identify:
1. Consolidate redundant state (size/coffeeSize)
2. Remove derived state and compute values directly
3. Fix useEffect dependency arrays
4. Add proper TypeScript types
5. Remove unused imports
6. Extract complex logic into descriptive functions
7. Fix the race condition with proper loading state management
8. Remove redundant JSX
9. Simplify component by removing unnecessary state

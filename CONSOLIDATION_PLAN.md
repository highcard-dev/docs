# Documentation Consolidation Plan

## Redundancies Found

### 1. **Port Configuration (MAJOR DUPLICATION)**
- **ColdStarter doc:** Full port config (sleep_handler, start_delay, check_activity, finish_after_command)
- **Scrolls doc:** EXACT same port config in Field Reference section
- **Solution:** Keep only in Scrolls doc, remove from ColdStarter

### 2. **"95 Scrolls" Mentioned 3 Times**
- ColdStarter: "All 95 published scrolls support ColdStarter"
- Scrolls: "95 published scrolls:" with full breakdown
- Scrolls: "Supported Games" section at bottom
- **Solution:** Remove game counts entirely, just link to repository

### 3. **Minecraft Example Duplication**
- ColdStarter: Links to minecraft.lua
- Scrolls: Shows PaperMC complete example with same minecraft.lua
- **Solution:** Keep in Scrolls only (where it's relevant)

### 4. **ColdStarter is Scroll Configuration**
- ColdStarter doc explains scroll.yaml port options
- It's already documented in Scrolls
- **Solution:** Merge ColdStarter into Scrolls as subsection

### 5. **DruidUI Package Docs Are Repetitive**
- All 5 packages: Installation → Usage → Options → See Also
- Same structure, similar content
- **Solution:** Consolidate into single "Packages Reference" page

### 6. **Nix Explanation is Too Long**
- "Why Nix?" lists benefits
- "How It Works" explains process
- Multi-version example
- **Solution:** Cut in half, keep only essentials

### 7. **Multiple scroll.yaml Examples**
- Minimal example (11 lines)
- Complete example (45 lines)
- Creating Your Own example (12 lines)
- **Solution:** Keep 2 examples max

## Proposed Structure

### Option A: Merge ColdStarter into Scrolls
```
docs/scrolls/
├── introduction.md        # Main scroll system docs
│   ├── What are Scrolls?
│   ├── scroll.yaml Format
│   ├── Field Reference
│   ├── ColdStarter (subsection)  ← Move here
│   └── Nix Integration
└── creating-scrolls.md    # Separate guide for creating scrolls
```

### Option B: Keep ColdStarter Separate (Simplified)
```
docs/cli/
└── coldstarter.md         # Ultra-short: What, Why, Config link

docs/scrolls/
└── introduction.md        # Full scroll.yaml reference with ColdStarter details
```

### Option C: Consolidate DruidUI Packages
```
docs/druid-ui/
├── introduction.md        # Overview
└── packages.md            # Single page with all 5 packages (short sections)
```

## Recommended Changes

### 1. ColdStarter → Make it 30 lines
```markdown
# ColdStarter

Wakes server when players connect, sleeps when idle. ~85% cost savings.

Configured via scroll.yaml ports. See [Scroll System](../scrolls/introduction.md#coldstarter).

## Custom Handlers

Create Lua packet handler:
```lua
function handle(ctx, data)
    if isConnect(data) then finish() end
end
```

[Full docs →](../scrolls/introduction.md#coldstarter)
```

### 2. Scrolls → Add ColdStarter subsection
Move all port config details here. One place for everything.

### 3. DruidUI Packages → Merge into one page
Each package gets 10-15 lines:
- What it does
- Installation
- Basic usage
- Link to GitHub

### 4. Remove All Game Counts
Instead of "95 published scrolls", just say:
"Browse available scrolls at github.com/highcard-dev/scrolls"

### 5. Cut Nix Section in Half
Remove:
- "Why Nix?" explanation
- "How It Works" 4-step process
Keep:
- One-line explanation
- Multi-version example (it's good)
- Link to nixpkgs

### 6. Remove One scroll.yaml Example
Keep:
- Minimal example (shows structure)
- Complete example (shows all features)
Remove:
- "Creating Your Own" example (redundant)

## Impact

**Current:** 1077 lines total
**After consolidation:** ~650 lines (40% reduction)

**Benefits:**
- No duplicate information
- Easier to maintain
- Single source of truth for scroll.yaml
- Less overwhelming for users

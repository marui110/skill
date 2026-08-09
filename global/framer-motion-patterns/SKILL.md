---
name: framer-motion-patterns
description: framer-motion 动效实现模板。用于添加列表入场、数字动画、页面区块 stagger、侧边栏 layout 动画，或新建 lib/motion.ts 时。
---

# Framer Motion Patterns

遵循 `global-motion-conventions` 规则。

## 何时用 framer vs CSS

| framer | CSS |
|--------|-----|
| 列表 stagger | 卡片 hover |
| AnimatedNumber | 按钮状态 |
| layout 宽度动画 | focus ring |
| AnimatePresence 切换 | skeleton shimmer |

## 设置

1. 创建 `lib/motion.ts`（见 `references/motion.ts`）
2. `motionColors` 从 CSS 变量或项目 brand token 读取，不散落硬编码
3. 组件内 `const reduce = useReducedMotion()`；reduce 时跳过 motion

## 常用模式

### 列表 stagger

```tsx
<motion.ul variants={variants.staggerContainer} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.li key={item.id} variants={variants.staggerItem}>{/* ... */}</motion.li>
  ))}
</motion.ul>
```

### 数字计数

```tsx
// components/motion/animated-number.tsx — useSpring + motion.span
```

### 页面区块

```tsx
<motion.section variants={variants.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
```

### 卡片 hover

```tsx
// CSS only — motion.cardHoverClass from lib/motion.ts
<article className={cn("ui-card", cardHoverClass)} />
```

## Checklist

- [ ] duration/ease 集中在 `lib/motion.ts`
- [ ] `MAX_STAGGER_ITEMS` 限制防性能问题
- [ ] `prefers-reduced-motion` 全局 CSS 降级
- [ ] 按钮不用 `whileHover={{ scale }}`

## 参考

- `references/motion.ts` — 完整 token 模板

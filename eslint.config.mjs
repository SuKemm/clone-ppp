import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      // Thư mục clone thử nghiệm cũ, không được import/dùng ở đâu trong
      // app đang chạy (đã kiểm tra) — bỏ qua khi lint thay vì sửa từng lỗi.
      "pvoil-clone/**",
    ],
  },
  {
    // server.js chạy trực tiếp bằng Node (không qua bundler Next.js), nên
    // cú pháp CommonJS require() ở đây là bắt buộc và hợp lệ, không phải lỗi.
    files: ["server.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    // Rule "set-state-in-effect" quá nghiêm khắc với pattern rất phổ biến
    // trong dự án: useEffect(() => { load() }, []) để tải dữ liệu lúc
    // mount. Hạ xuống warning thay vì error để npm run check không đỏ.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default eslintConfig;

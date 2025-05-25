import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export default function CustomButton({ label, isLoading, color, background, height, width, type, borderRadius }) {
    const style = { color: color, background: background, height: height, width: width, borderRadius: borderRadius, textTransform: "capitalize" }

    return (
        <Button type={type} disabled={isLoading} sx={style}>
            {isLoading ? <CircularProgress size="30px" />
                : label}
        </Button>
    );
}

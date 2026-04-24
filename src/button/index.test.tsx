import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from 'vitest';
import {Button} from './button';

describe('Button', () => {
    it('renders correctly', () => {
        const {container} = render(<Button>Follow</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render a button', () => {
        render(<Button>Click Me!</Button>);

        expect(screen.getByRole('button', {name: 'Click Me!'})).toBeInTheDocument();
    });

    it('should call onClick when clicked', async () => {
        // arrange
        const onClick = vi.fn();
        const {container} = render(<Button onClick={onClick}>Click Me!</Button>);

        // action
        await userEvent.click(container.firstChild as HTMLElement);

        // assert
        expect(onClick).toHaveBeenCalled();
    });
    it('should not call onClick when button is disabled', async () => {
        // arrange
        const onClick = vi.fn();
        const {container} = render(
            <Button disabled onClick={onClick}>
                Click Me!
            </Button>
        );

        // action
        await userEvent.click(container.firstChild as HTMLElement);

        // assert
        expect(onClick).not.toHaveBeenCalled();
    });

    //className
    it('should render a button with className', () => {
        // arrange
        const {container} = render(<Button className='btn'>Click Me!</Button>);

        // assert
        expect(container.firstChild).toHaveClass('btn');
    });

    it("should render with slot", () => {
        const { container } = render(<Button size="xs" />);
        expect(container.firstChild).toHaveClass("text-xs px-2 py-1");
    });

    it("should render with children", () => {
        const { container } = render(
          <Button>
              <span className="test-slot" />
          </Button>
        );
        expect(container.querySelector(".test-slot")).toBeInTheDocument();
      });
});
